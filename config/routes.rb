Rails.application.routes.draw do
  resources :users
  resources :record_databases
  get '/search' => 'record_databases#search', :as => 'search_record_database'

end
