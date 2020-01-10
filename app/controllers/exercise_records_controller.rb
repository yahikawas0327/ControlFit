class ExerciseRecordsController < ApplicationController

    def update
        # Update daily record system
          current_data = SportRecord.find_by(id:params[:id])
          current_data_sum = current_data.totalconsum
          update_min = params[:min]
          update_sum = params[:totalconsum]
          min=current_data.min
          sum=current_data.totalconsum
          current_data.update(
                              :min => update_min,
                              :totalconsum => update_sum)
        # Update daily sum 
          statistic = Statistic.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
          statistic_sum   = statistic[0].sportsum
          statistic_count = statistic[0].sportcount
          statistic_id    = statistic[0].id
          statistic_update_sum = (statistic_sum - current_data_sum) + (update_sum).to_i
          statistic_update_item =Statistic.find_by(id:statistic_id)
          statistic_update_item.update(:sportsum => statistic_update_sum)
          puts "---------------------------------------"

    end

    def destroy
          delete_data = SportRecord.find_by(id:params[:id])
        
        # Update daily sum and reduce count
          statistic = Statistic.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
          statistic_sum   = statistic[0].sportsum
          statistic_count = statistic[0].sportcount
          statistic_id    = statistic[0].id

          delete_data_sum = delete_data.totalconsum
          puts #--------------------------------------------------
          puts delete_data.id
          puts delete_data_sum
          puts #--------------------------------------------------
          statistic_update_sum = (statistic_sum) - (delete_data_sum).to_i
          statistic_update_item =Statistic.find_by(id:statistic_id)
          statistic_update_item.update(:sportsum => statistic_update_sum,
                                       :sportcount => statistic_count - 1)
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
                             :foodsum  => 0,
                             :foodcount => 0,
                             :member_id  => sport_user)
          else
            if (statistic[0].sportcount == 0 ) && (statistic[0].sportsum == 0 )
              statistic_id    = statistic[0].id
              statistic_update_item =Statistic.find_by(id:statistic_id)
              statistic_update_item.update(:sportsum => sport_totalconsume,
                                            :sportcount => 1,)
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
            # statistic_sum   = statistic[0].sportsum
            # statistic_count = statistic[0].sportcount
            # statistic_id    = statistic[0].id
            # update_sum      = sport_totalconsume + statistic_sum
            # update_count    = statistic_count + 1
            # statistic_update_item =Statistic.find_by(id:statistic_id)
            # statistic_update_item.update(:sportsum => update_sum,
            #                              :sportcount => update_count)

          end
     
         # Render json file 
          @sport_records = SportRecord.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
 
        
         #回傳json 至前端
          render json:  @sport_records.last   
    end
    
    def statistics
    end

    private 



end
