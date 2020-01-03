<<<<<<< HEAD
class MembersController < ApplicationController
  def show
    @members = current_member
  end
  
end
=======
class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    @members = current_member
  end
end
>>>>>>> origin/master
