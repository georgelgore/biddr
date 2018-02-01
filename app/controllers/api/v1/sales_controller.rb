class Api::V1::SalesController < ApplicationController
  def index
    @sales = Sale.all
    render json: @sales
  end

  def show
    @sale = Sale.find(params[:id])
    render json: @sale
  end

end
