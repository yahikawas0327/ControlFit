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
        
        # Write Daily sport sum count to Statistic database
        statistic = Statistic.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
        if (statistic[0].foodcount.blank?) && (statistic[0].foodsum.blank?)
            if (statistic.blank?)
            Statistic.create(:foodsum => total_calories,
                             :foodcount => 1,
                             :member_id  => current_member.id )
            else
            statistic_id    = statistic[0].id
            statistic_update_item =Statistic.find_by(id:statistic_id)
            statistic_update_item.update(:foodsum => total_calories,
                                         :foodcount => 1,)
            end
        else
            statistic_sum   = statistic[0].foodsum
            statistic_count = statistic[0].foodcount
            statistic_id    = statistic[0].id
            update_sum      = total_calories + (statistic_sum).to_i
            update_count    = (statistic_count).to_i + 1
            statistic_update_item =Statistic.find_by(id:statistic_id)
            statistic_update_item.update(:foodsum => update_sum,
                                         :foodcount => update_count)
        end                  
        


        # Renodr json file 
        @food_records = FoodRecord.where(member_id: current_member.id, created_at: Time.now.midnight..Time.now)

        
        #回傳json 至前端
        render json: @food_records.last

                     
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
        # Update daily sum 
        statistic = Statistic.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
        statistic_sum   = statistic[0].foodsum
        statistic_count = statistic[0].foodcount
        statistic_id    = statistic[0].id
        statistic_update_sum = statistic_sum - (origin_total).to_i + (update_total).to_i
        statistic_update_item =Statistic.find_by(id:statistic_id)
        statistic_update_item.update(:foodsum => statistic_update_sum)
        render json: current_data
    end

    def destroy
        delete_data = FoodRecord.find_by(id:params[:id])
         # Update daily sum and reduce count
         statistic = Statistic.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
         statistic_sum   = statistic[0].foodsum
         statistic_count = statistic[0].foodcount
         statistic_id    = statistic[0].id

         delete_data_sum = delete_data.total_calorie
         statistic_update_sum = (statistic_sum) - (delete_data_sum).to_i
         statistic_update_item =Statistic.find_by(id:statistic_id)
         statistic_update_item.update(:foodsum => statistic_update_sum,
                                      :foodcount => statistic_count - 1)
         delete_data.destroy
    end

    def statistics
    end

end
