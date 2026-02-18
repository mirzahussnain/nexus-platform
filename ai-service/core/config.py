import spacy
import subprocess
import sys

def load_config():

    try:
        nlp = spacy.load("en_core_web_sm")
    except OSError:
        print("Downloading language model...")
        subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
        nlp = spacy.load("en_core_web_sm")
    return {
        "nlp": nlp,

        "URGENCY_KEYWORDS": {
            "HIGH": ["leak","burst","fire","smoke","flood","gas","explode","spark"],
            "MEDIUM": ["mold","damp","heating","boiler","hot","water","lock","window"],
            "LOW": []
        },

        "CATEGORY_KEYWORDS": {
            "PLUMBING": ["leak","pipe","water","toilet","drain","tap"],
            "ELECTRICAL": ["electric","socket","spark","power","light","wire"],
            "STRUCTURAL": ["crack","wall","ceiling","roof","floor"],
            "HEATING": ["boiler","radiator","heater","thermostat"]
        },

        "ACTIONS": {
            ("HIGH","PLUMBING"): "Dispatch emergency plumber immediately",
            ("HIGH","ELECTRICAL"): "Disconnect power and send electrician",
            ("MEDIUM","HEATING"): "Schedule engineer visit within 24h",
            ("LOW","STRUCTURAL"): "Add to maintenance queue"
        }
    }
