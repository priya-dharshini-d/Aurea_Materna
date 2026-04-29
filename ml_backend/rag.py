import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

# Aurea Materna Knowledge Base
KNOWLEDGE_BASE = [
    {
        "id": "doc1",
        "title": "Diet & Nutrition",
        "content": "During pregnancy, include plenty of fruits, vegetables, whole grains, and calcium-rich foods like milk and yogurt. Avoid raw meat, unpasteurized dairy, and excessive caffeine. Folic acid and iron supplements are highly recommended."
    },
    {
        "id": "doc2",
        "title": "Fetal Movement",
        "content": "You should feel your baby move several times a day by the third trimester. A normal count is at least 10 movements in 2 hours. If you notice a sudden decrease in movement, contact your ASHA worker or healthcare provider immediately."
    },
    {
        "id": "doc3",
        "title": "Morning Sickness",
        "content": "To manage morning sickness, eat small, frequent meals instead of three large ones. Ginger tea, peppermint, and plain crackers can help settle your stomach. Stay hydrated by sipping water throughout the day."
    },
    {
        "id": "doc4",
        "title": "Exercise Guidelines",
        "content": "Moderate exercise like walking, swimming, and prenatal yoga is beneficial for both mother and baby. It helps reduce back pain and prepares the body for labor. Avoid contact sports and activities with a high risk of falling."
    },
    {
        "id": "doc5",
        "title": "Preeclampsia Warning Signs",
        "content": "High blood pressure during pregnancy is dangerous. Warning signs of preeclampsia include severe headaches, vision changes (blurriness or flashing lights), upper abdominal pain, and sudden swelling in the hands or face. Seek emergency care if these occur."
    },
    {
        "id": "doc6",
        "title": "Signs of Labor",
        "content": "Signs that labor is starting include regular contractions that get stronger and closer together, your water breaking (amniotic fluid leakage), or losing your mucus plug (bloody show). When contractions are 5 minutes apart, go to the hospital."
    },
    {
        "id": "doc7",
        "title": "Sleep Positions",
        "content": "In the second and third trimesters, sleeping on your side (preferably the left side) is best. It improves blood flow to the placenta and your kidneys. Avoid sleeping on your back as it puts pressure on a major vein."
    },
    {
        "id": "doc8",
        "title": "Aurea Materna App Features",
        "content": "The Aurea Materna system provides real-time health monitoring (heart rate, temperature, BP, SpO2) via a wearable sensor. It features an emergency alert system (SOS) for critical situations, personalized diet recommendations, a multilingual chatbot for support, and weekly pregnancy guidance for expecting mothers."
    }
]

# Initialize TF-IDF Vectorizer
documents = [(doc["title"] + " " + doc["content"]) for doc in KNOWLEDGE_BASE]
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(documents)

# System Prompt provided by User
SYSTEM_PROMPT = """You are a multilingual AI assistant specialized in pregnancy care and maternal health. You are powered by Retrieval-Augmented Generation (RAG), and you must answer using only the provided knowledge base context.

Your Responsibilities:
- Explain features of the pregnancy support system (health monitoring, alerts, diet guidance, etc.).
- Answer common pregnancy-related questions clearly and safely.
- Provide helpful, easy-to-understand guidance for mothers.

Multilingual Behavior:
- Detect the user’s language automatically.
- Respond in the same language (English, Tamil, Hindi, etc.).
- Keep responses simple and culturally appropriate.

Answering Rules:
- Use only the provided context to answer.
- If information is missing, say: "I don’t have enough information in my knowledge base."
- Do not guess or provide unsafe advice.

Tone: Calm, caring, supportive, and respectful. Avoid scary or alarming language.
Safety Guidelines: Always recommend consulting a doctor for serious symptoms. Never prescribe medicines. Avoid giving medical diagnosis.
"""

def query_rag(user_query: str):
    """
    Retrieval-Augmented Generation (RAG) pipeline using Gemini API.
    """
    # 1. Retrieval
    query_vec = vectorizer.transform([user_query])
    similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    
    best_idx = np.argmax(similarities)
    best_score = similarities[best_idx]
    
    retrieved_content = ""
    source_title = None
    
    # Threshold for retrieval
    if best_score >= 0.02:
        retrieved_content = KNOWLEDGE_BASE[best_idx]["content"]
        source_title = KNOWLEDGE_BASE[best_idx]["title"]
    
    # 2. Generation using Gemini API
    if not API_KEY:
        return {
            "answer": "⚠️ Gemini API key is missing. Please add GEMINI_API_KEY to your .env file in the ml_backend folder to enable the multilingual AI assistant.",
            "source_title": None,
            "confidence": 0.0
        }
        
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT
        )
        
        prompt = f"""
        User Question: {user_query}
        
        Knowledge Base Context: {retrieved_content if retrieved_content else "No relevant context found in knowledge base."}
        """
        
        response = model.generate_content(prompt)
        
        return {
            "answer": response.text,
            "source_title": source_title,
            "confidence": round(float(best_score), 2)
        }
        
    except Exception as e:
        return {
            "answer": f"⚠️ Error generating response: {str(e)}",
            "source_title": None,
            "confidence": 0.0
        }
# Reload trigger
