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
                          :total_calorie => total_calories,
                          :member_id => current_member.id)
         
        # Renodr json file 
        @food_records = FoodRecord.where(created_at: Time.now.midnight..Time.now)

        
        #回傳json 至前端
        render json: @food_records.last(2)

                     
    end

    def update
        current_data = FoodRecord.find_by(id:params[:edit_id])
        update_type    = (params[:edit_type]).to_s
        update_qty     = (params[:edit_qty]).to_i
        origin_type    = current_data.eat_type
        origin_qty     = (current_data.qty).to_i
        origin_calories= (current_data.calories).round(2)
        origin_total   = (current_data.total_calorie).round(2)
        update_total   =  (update_qty * origin_calories).round(2)
        current_data.update(
                            :eat_type      => update_type,
                            :qty           => update_qty,
                            :total_calorie => update_total)
         puts "finish"
         render json: current_data
    end

    def destroy
        delete_data = FoodRecord.find_by(id:params[:id])
        delete_data.destroy
    end

    def statistics
    end

end
