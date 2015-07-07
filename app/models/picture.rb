class Picture < ActiveRecord::Base

belongs_to :album
has_and_belongs_to_many :tags


has_attached_file :photo,


:styles => { 

:thumb => '100x100>',:small => '150x150>', :large => '320x240>' }

validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

accepts_nested_attributes_for :tags


#  self.tags = names.split(",").map do |name|
#      Tag.where(name: name.strip).first_or_create!
#  end
#end
# 
#def self.all_tags
#  self.tags.map(&:name).join(", ")
#end
#
#def self.tagged_with(name)
#  Tag.find_by_name!(name).pictures
#end



end
