Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :sales
      resources :artists
      resources :lots
      resources :data
      # get '/data' to 'data#'
    end
  end
end
