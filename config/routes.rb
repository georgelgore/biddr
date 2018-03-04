Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :sales
      resources :artists
      resources :lots
      resources :top_artists
      resources :top_sales
      resources :high_lots
    end
  end
end
