class Api::V1::SalesController < ApplicationController
  def index
    @sales = Sale.includes(lots: [:artist]).all
    render json: @sales
  end

  def show
    @sale = Sale.includes(lots: [:artist]).find(params[:id])
    render json: @sale
  end

end
