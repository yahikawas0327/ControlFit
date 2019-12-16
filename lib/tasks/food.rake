task food: :environment do
  # require 'net/http'
  # require 'json'

  url = 'https://www.ragic.com/ForContent/forms3/2?v=3&api='
  uri = URI(url)
  response = Net::HTTP.get(uri)
  FoodDatabase.delete_all
  foods = JSON.parse(response)
  foods.each do |food|
    FoodDatabase.create(
      name: food.last['食物名稱'],
      calories: food.last['熱量(大卡)'],
      protein: food.last['蛋白質(公克)'],
      fat_content: food.last['脂肪(公克)'],
      carbohydrate: food.last['碳水化合物(公克)'],
      food_type: food.last['類別']
    )
  end
end