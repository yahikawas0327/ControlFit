class FoodRecordsController < ApplicationController
   
    def create
        # Obtain Post data from Query system
        food_record= FoodDatabase.find_by(id:params[:food_id])
        food_qty=params[:food_qty]
        food_type=params[:food_type]
        total_calories= (food_qty.to_i) * (food_record.calories.round(2))
       
        # Write Daily food data to FoodRecord database
        FoodRecord.create(:name => food_record.name , 
                          :calories => food_record.calories.round(2),
                          :qty => food_qty,
                          :eat_type => food_type,
                          :total_calorie => total_calories  )
        
        render json: {status: 'ok'}
                     
    end

end
