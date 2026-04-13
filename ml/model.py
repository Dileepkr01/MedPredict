import pandas as pd
from sklearn.linear_model import LinearRegression

# Sample historical data (simulate hospital data)
data = {
    "day": [1,2,3,4,5,6,7,8,9,10],
    "patients": [20,25,30,35,40,50,55,60,65,70]
}

df = pd.DataFrame(data)

X = df[["day"]]
y = df["patients"]

# Train model
model = LinearRegression()
model.fit(X, y)

# Predict next day
next_day = [[2]]
prediction = model.predict(next_day)

# Output result
print(int(prediction[0]))