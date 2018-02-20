class Api::V1::HighLotsController < ApplicationController
  def index
    @high_lots = HighLot.all
    render json: @high_lots
  end
end
