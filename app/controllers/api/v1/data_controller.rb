class Api::V1::DataController < ApplicationController
  def index
    @lots = Lot.all.sort_by{|lot| lot.realized}[-5..-1]
    byebug
  end



end
