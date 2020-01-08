class ExerciseRecordsController < ApplicationController

    def update
        # Update daily record system
          current_data = SportRecord.find_by(id:params[:id])
          current_data_sum = current_data.totalconsum
          update_min = params[:min]
          update_sum = params[:totalconsum]
          min=current_data.min
          sum=current_data.totalconsum
          # current_data.update(
          #                     :min => update_min,
          #                     :totalconsum => update_sum)
        # Update daily sum 
          statistic = Statistic.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
          statistic_sum   = statistic[0].sportsum
          statistic_count = statistic[0].sportcount
          statistic_id    = statistic[0].id
          statistic_update_sum = (statistic_sum - current_data_sum) + (update_sum).to_i
          puts  statistic_sum
          puts  current_data_sum
          puts  update_sum
          puts statistic_update_sum

          # statistic_update_item =Statistic.find_by(id:statistic_id)
          # statistic_update_item.update(:sportsum => update_sum)

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
          sport_totalconsume = (params[:consume]).to_i
          sport_user    = params[:user_id]

         # Write Daily sport data to FoodRecord database
          SportRecord.create(:name => sport_name , 
          :weight => sport_weight,
          :min => sport_min,
          :consume => sport_consume,
          :totalconsum => sport_totalconsume,
          :member_id => sport_user )

          # Write Daily sport sum count to Statistic database
          statistic = Statistic.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
          if statistic.blank?
            Statistic.create(:sportsum => sport_totalconsume,
                             :sportcount => 1,
                             :member_id  => sport_user )
          else
            statistic_sum   = statistic[0].sportsum
            statistic_count = statistic[0].sportcount
            statistic_id    = statistic[0].id
            update_sum      = sport_totalconsume + statistic_sum
            update_count    = statistic_count + 1
            statistic_update_item =Statistic.find_by(id:statistic_id)
            statistic_update_item.update(:sportsum => update_sum,
                                         :sportcount => update_count)
          end
     
         # Renodr json file 
          @sport_records = SportRecord.where(created_at: Time.now.midnight..Time.now)
 
        
         #回傳json 至前端
          render json:  @sport_records.last   
    end
    
    def statistics
    end

    private 



end
