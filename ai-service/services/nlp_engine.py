def process_text(nlp, text: str):
    doc = nlp(text.lower())

    tokens = [token.lemma_ for token in doc]
    noun_chunks = [chunk.text for chunk in doc.noun_chunks]

    return tokens, noun_chunks
