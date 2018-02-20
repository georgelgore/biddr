class Api::V1::TopSalesController < ApplicationController
  def index
    @top_sales = TopSale.all
    render json: @top_sales
  end
end
