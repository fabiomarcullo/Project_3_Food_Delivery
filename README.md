# Project_3_Food_Delivery

## Project 3:
Food related; different food that Canadians eat
## GOAL?
To build something (a webpage? an app?) that allows the user to search what they want to eat based on preference and price, etc (other filters) .
## WHY?
Food prices are so expensive, and there are so many choices out there.
If you live alone or even if you have a family, anyone would benefit from spending less time to decide what you want to eat and to get the most out of your money.
## IDEAS:
Doordash orders dataset (could probably extend the webscraping method to ubereats to use their dataset https://www.kaggle.com/datasets/satoshiss/food-delivery-in-canada-door-dash/code)
- Leaflet chloropleth map
- Most-ordered food per neighbourhood in the GTA
- Highest ratings/lowest rating
- Restaurant with good reviews/bad reviews
- Multiple ways to filter data? I.e. two or more selection boxes?
- Chloropleth map? Cluster markers?

## Codes

- [WebScraping by Cities](https://github.com/fabiomarcullo/Project_3_Food_Delivery/tree/main/Cities/)
- [Geopy_API](https://github.com/fabiomarcullo/Project_3_Food_Delivery/tree/main/Jupyter Files/Geopy_API.ipynb)

## Output

- [Category Data Frame](https://github.com/fabiomarcullo/Crowdfunding_ETL/tree/main/Resources/category.csv)
- [Subcategory Data Frame](https://github.com/fabiomarcullo/Crowdfunding_ETL/tree/main/Resources/subcategory.csv)
- [Campaign Data Frame](https://github.com/fabiomarcullo/Crowdfunding_ETL/tree/main/Resources/campaign.csv)
- [Contacts Data Frame](https://github.com/fabiomarcullo/Crowdfunding_ETL/blob/main/Resources/contacts.csv)

## Data Source

  ### WebScraping from https://www.ubereats.com/ website.

 ```python

# Import dependencies/libraries
from splinter import Browser
from bs4 import BeautifulSoup as soup
import pandas as pd

# Setting up the browser
browser = Browser('chrome')

# Visiting the website
base_url = "https://www.ubereats.com/ca/city/"
location = "edmonton-ab/"
url = base_url + location
browser.visit(url)

html = browser.html
soup = soup(html, 'html.parser')

# Restaurant name

res_name = soup.find_all('div', class_='al ii br j2 c3')
restaurants = []

for i in res_name:
    restaurant = i.find('h3').text.strip()
    restaurants.append(restaurant)

df = pd.DataFrame(restaurants, columns=['Restaurant Name'])
print(df)

# Rating information 

res_Rating = soup.find_all('div', class_='br al b9 bm c3 dd j3')

ratings = []

for i in res_Rating:
    rating = i.find('div').text.strip()
    ratings.append(rating)

df2 = pd.DataFrame(ratings, columns=['Rating'])
print(df2)

# Address
res_Address = soup.find_all('div', class_='fz jb al ii')
addresses = []

for i in res_Address:
    if i.text:
        spans = i.find_all('span')
        if len(spans) > 1:
            address = spans[1].text.strip()
            addresses.append(address)

df3 = pd.DataFrame(addresses, columns=['Address'])
print(df3)

# Category
res_category = soup.find_all('div', class_='al ii br j2 c3')
categories = []

for i in res_category:
    span_text = i.find('span').text.strip()
    category = span_text.split('•')[0].strip()
    categories.append(category)

df4 = pd.DataFrame(categories, columns=['Category'])
print(df4)

# Join the DataFrames in the desired order
result = pd.concat([df, df2, df4, df3], axis=1)

result.head()

# Export the joined DataFrame to an Excel file
result.to_csv('edmonton-ab.csv', index=False)

browser.quit()
 ```
 
## Deploy our app on a GitHub Pages.

# Results

[Project_3_Food_Delivery_WebSite](https://fabiomarcullo.github.io/Belly-button-challenge/)

![HTML screenshot image](Images/WebSite.JPG)