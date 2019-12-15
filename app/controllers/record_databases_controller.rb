class RecordDatabasesController < ApplicationController
    def index
    end
  
    def show
    end
  
    def new
    end
  
    def edit
    end
  
    def updata
    end
  
    def destroy
    end

    def search
        @food_databases = FoodDatabase.all
        @search = params["search"]
    
        if @search.present?
          @food_databases = FoodDatabase.where("name ILIKE ?", "%#{@search}%")
        end
    end
    
end
