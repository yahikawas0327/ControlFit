class RecordDatabasesController < ApplicationController
    def index
    end
  
    def show
    end
  
    def new
    end
  
    def edit
    end

    def create
    end

  
    def updata
    end
  
    def destroy
    end

    def search_food

        @search_food = params["search_food"]
        @food_databases = []
        #---------------------------------------
        if current_member.present?
          @record_foods = FoodRecord.where(member_id: current_member.id, created_at: (Time.now.midnight)..(Time.now))
          food_sum
          current_user_secret = Membersecret.find_by( member_id: current_member.id)
          # daily_target
          if @search_food.present?
            @food_databases = FoodDatabase.where("name ILIKE ?", "%#{@search_food}%")            
            respond_to do |format|
              format.json { render json: @food_databases}
              format.html { render :search_food}
           end
          else
          end
          if current_user_secret.present?
             @current_user_secret = Membersecret.find_by( member_id: current_member.id)
          else
          end
        else       
        end
    end

    def search_sport
      @search_sport = params["search_sport"]
      @sports = []
      if @search_sport.present?
          @sports= Sport.where("name ILIKE ?", "%#{@search_sport}%")
          respond_to do |format|
            format.json { render json: @sports}
            format.html { render :search_sport }
          end      
      else 
      end
      
      daily_sport = params["member_id"]
      if daily_sport.present?
        @record_sports = SportRecord.where(member_id: params[:member_id], created_at: (Time.now.midnight)..(Time.now))  
          
        respond_to do |format|
          format.json { render json: @record_sports}
          format.html { render :search_sport }
        end  
      else
      end
    end
     
    private 

    def food_sum
        @sum=0
        @record_foods.each do |record_food|
        @sum = @sum + record_food.total_calorie
     end
    end

    # def daily_target
    #     tdee = @current_user_secret.tdee
    #     @daily_delta = @sum - tdee
    # end
    
end
