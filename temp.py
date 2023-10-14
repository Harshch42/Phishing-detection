import openai

openai.api_key = "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"

response = openai.Completion.create(
    engine="davinci",
    prompt="Test cricket",
    max_tokens=50
)

print(response.choices[0].text)
