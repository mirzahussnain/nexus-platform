def detect_urgency(tokens, urgency_dict):
    urgency = "LOW"
    score = 10
    matched = []

    for level, words in urgency_dict.items():
        found = [w for w in tokens if w in words]
        if found:
            urgency = level
            score = {"HIGH":100,"MEDIUM":50,"LOW":10}[level]
            matched.extend(found)
            break

    return urgency, score, matched


def detect_category(tokens, category_dict):
    category_counts = {}
    matched = []

    for category, words in category_dict.items():
        matches = [t for t in tokens if t in words]
        if matches:
            category_counts[category] = len(matches)
            matched.extend(matches)

    if not category_counts:
        return "GENERAL", matched

    best = max(category_counts, key=lambda k: category_counts[k])
    return best, matched


def calculate_confidence(matched, total_tokens):
    if total_tokens == 0:
        return 0.0
    return round(len(set(matched))/total_tokens,2)
