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
           puts "update successful"
           puts current_data
           puts update_min
           puts min
           puts update_sum
           puts sum
           
    end
    def create
        # Obtain Post data from Query system && Sport database
           sport_record  = Sport.find_by(id:params[:id])
           sport_name    = sport_record.name
           sport_min     = params[:min]
           sport_weight  = (params[:weight]).to_i
           sport_consume = (params[:consume]).to_i
           puts "----------------------"
           puts sport_consume.class
           puts "----------------------"

         # Write Daily food data to FoodRecord database
           SportRecord.create(:name => sport_name , 
           :weight => sport_weight,
           :min => sport_min,
           :totalconsum => sport_consume )
     
         # Renodr json file 
           @sport_records = SportRecord.where(created_at: Time.now.midnight..Time.now)
 
        
         #回傳json 至前端
           render json:  @sport_records.last    
    end
end
