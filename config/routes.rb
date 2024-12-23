Rails.application.routes.draw do
  devise_for :users, controllers:{
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
  },defaults: { format: :json }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :v1 do
      resources :posts
    end
  end
  get "/current_user", to: "application#current"
  root 'pages#index'

  get '*path', to: 'pages#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
