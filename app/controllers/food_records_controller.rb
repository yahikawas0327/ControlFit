class FoodRecordsController < ApplicationController
   
    def create
        # Obtain Post data from Query system
        if params[:food_id] == 0
           
           food_name     = params[:food_name]
           food_calories = (params[:food_calories]).to_i
        else 
           food_record   = FoodDatabase.find_by(id:params[:food_id])
           food_name     = food_record.name
           food_calories = food_record.calories.round(2)
        end

           food_qty=params[:food_qty]
           food_type=params[:food_type]
           total_calories= (food_qty.to_i) * (food_calories.round(2))
                  
        # Write Daily food data to FoodRecord database
        FoodRecord.create(:name => food_name , 
                          :calories => food_calories,
                          :qty => food_qty,
                          :eat_type => food_type,
                          :total_calorie => total_calories  )
         
        # Renodr json file 
        @food_records = FoodRecord.where(created_at: Time.now.midnight..Time.now)

        
        render json: @food_records.last
                     
    end

end
