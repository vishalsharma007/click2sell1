class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

     has_many :albums

     validates :firstname,:lastname, presence: true

   before_create :set_fullname

  def set_fullname
 
    self.fullname = self.firstname self.lastname
  end



         ROLES = %w[admin moderator author banned]

	def roles=(roles)
		self.roles_mask = (roles & ROLES).map { |r| 2**ROLES.index(r)}.inject(0,:+)
	end

	def roles
		ROLES.reject do |r|
			((roles_mask.to_i||0)& 2**ROLES.index(r)).zero?
	end
end

	def is?(role)
 	 roles.include?(role.to_s)
	end




end
