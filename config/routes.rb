Rails.application.routes.draw do
  devise_for :members, controllers: {registrations: 'members/registrations' ,omniauth_callbacks: 'members/omniauth_callbacks' }
  resource :member, only: :show do
    member do
      get :following, :followers
      get :day,:month,:week
    end
  end

  resources :relationships, only:[:create, :destroy]

  resources :blogs  do 
    member do 
       patch :tdee   #/blog/:id/tdee
       get   :secret #/blog/:id/secret
    end
  end
  
  resources :records
  root 'records#index'
  resources :users
  resources :record_databases
  resources :exercise_records
  resources :food_records
  resources :demands
  
  get '/search_sport/statistics' => 'exercise_records#statistics', :as => 'statistics_exercise_record'
  get '/search_food/statistics' => 'food_records#statistics', :as => 'statistics_food_record'
  get '/search_food' => 'record_databases#search_food', :as => 'search_food_record_database'
  get '/search_sport' => 'record_databases#search_sport', :as => 'search_sport_record_database'
end

