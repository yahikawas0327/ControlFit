class UsersController < ApplicationController
  before_action :authenticate_member!
  def index
    @member = Member.all.with_attached_cover_image
  end

  def show
    @member = Member.all.find(params[:id])
    @food = FoodRecord.where(member_id: @member.id)
    @calories = []
    @food.each do |f|
      @calories << f['calories']
    end
  end

  def new
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
