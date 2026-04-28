import urllib.request
import os
import urllib.parse
import time

os.makedirs('assets/images/wellness', exist_ok=True)

prompts = [
    "2D flat vector illustration of a pregnant woman meditating peacefully, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman listening to music with headphones, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman holding her belly lovingly, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman deep breathing in nature, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman sleeping peacefully, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman relaxing in a forest, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman doing gentle yoga, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman smiling with positive energy, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman in calm water, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman doing light exercise, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman imagining a beautiful baby, simple anime style, inclusive, pastel background",
    "2D flat vector illustration of a pregnant woman stretching her back, simple anime style, inclusive, pastel background"
]

for i, prompt in enumerate(prompts):
    url = f"https://image.pollinations.ai/prompt/{urllib.parse.quote(prompt)}?width=600&height=400&nologo=true"
    filepath = f"assets/images/wellness/img_{i+1}.jpg"
    print(f"Downloading {i+1}...")
    
    req = urllib.request.Request(url)
    req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
    req.add_header('Accept', 'image/webp,image/apng,image/*,*/*;q=0.8')
    
    success = False
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as response:
                with open(filepath, 'wb') as f:
                    f.write(response.read())
            success = True
            break
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {i+1}: {e}")
            time.sleep(2)
    
    if not success:
        print(f"FAILED entirely to download {i+1}")

print("Done")
