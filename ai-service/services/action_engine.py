def recommend_action(urgency, category, actions):
    return actions.get(
        (urgency, category),
        "Manual review required"
    )
