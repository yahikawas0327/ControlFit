task sport: :environment do
  
  sports = JSON.parse(File.read('sport.json'))
  Sport.delete_all
  sports.each do |sport|
    Sport.create(
      name: sport['運動項目'],
      consume: sport['消耗熱量(大卡/公斤體重/小時)'],
      consume_40kg: sport['40公斤運動30分鐘所消耗的熱量 (大卡)'],
      consume_50kg: sport['50公斤運動30分鐘所消耗的熱量 (大卡)'],
      consume_60kg: sport['60公斤運動30分鐘所消耗的熱量 (大卡)'],
      consume_70kg: sport['70公斤運動30分鐘所消耗的熱量 (大卡)']
    )
    end
  end