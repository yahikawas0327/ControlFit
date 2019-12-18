class FoodRecordsController < ApplicationController
   
    def create
        # Obtain Post data from Query system
        food_record= FoodDatabase.find_by(id:params[:food_id])
       
        # Write Daily food data to FoodRecord database
        FoodRecord.create(:name => food_record.name , :calories => food_record.calories)
        
        render json: {status: 'ok'}
                     
    end

end
