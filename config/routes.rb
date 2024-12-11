Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  devise_for :users, controllers:{
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  },defaults: { format: :json }

  namespace :api do
    namespace :v1 do
        resources :posts
      end
  end
  get "/current_user", to: "application#current"

  root 'posts#index'
end