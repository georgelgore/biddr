class Api::V1::SalesController < ApplicationController
  def index
    @sales = Sale.all
    render json: SaleSerializer.new(@sales).serialized_json
  end

  def show
    @sale = Sale.find(params[:id])
    render json: SaleSerializer.new(@sale).serialized_json
  end

end
