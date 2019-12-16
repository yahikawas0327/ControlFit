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
        @search = params["search"]
        @food_databases = []
        if @search.present?
          @food_databases = FoodDatabase.where("name ILIKE ?", "%#{@search}%")
        end
    end
    
end
