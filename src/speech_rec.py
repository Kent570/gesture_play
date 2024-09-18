# Install the SpeechRecognition library
!pip install SpeechRecognition pydub

import speech_recognition as sr

# Initialize recognizer
recognizer = sr.Recognizer()

# Load an audio file instead of using the microphone
# Should be changed later. I'm using google cola and it can't directly assess the microphone
from google.colab import files
uploaded = files.upload()

# Assume an uploaded audio file in .wav format
audio_file_path = list(uploaded.keys())[0]

with sr.AudioFile(audio_file_path) as source:
    print("Processing the audio file...")
    audio = recognizer.record(source)  # Read the entire audio file
    
    try:
        # Recognize speech using Google Web Speech API
        text = recognizer.recognize_google(audio)
        print("You said: " + text)
        
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand the audio.")
    except sr.RequestError as e:
        print(f"Could not request results from the speech recognition service; {e}")
