class ExerciseRecordsController < ApplicationController

    def update
        # Update daily record system
          current_data = SportRecord.find_by(id:params[:id])
          update_min = params[:min]
          update_sum = params[:totalconsum]
          min=current_data.min
          sum=current_data.totalconsum
          current_data.update(
                              :min => update_min,
                              :totalconsum => update_sum)
    end

    def destroy
          delete_data = SportRecord.find_by(id:params[:id])
          delete_data.destroy
    end

    def create
        # Obtain Post data from Query system && Sport database
          sport_record  = Sport.find_by(id:params[:id])
          sport_name    = sport_record.name
          sport_consume = sport_record.consume
          sport_min     = params[:min]
          sport_weight  = (params[:weight]).to_i
          sport_tolconsume = (params[:consume]).to_i
          sport_user    = params[:user_id]

         # Write Daily food data to FoodRecord database
          SportRecord.create(:name => sport_name , 
          :weight => sport_weight,
          :min => sport_min,
          :consume => sport_consume,
          :totalconsum => sport_tolconsume,
          :member_id => sport_user )
     
         # Renodr json file 
          @sport_records = SportRecord.where(created_at: Time.now.midnight..Time.now)
 
        
         #回傳json 至前端
          render json:  @sport_records.last    
    end
    
    def statistics
    end
end
