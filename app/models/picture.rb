class Picture < ActiveRecord::Base

belongs_to :album
has_and_belongs_to_many :tags


has_attached_file :photo,


:styles => { 

:thumb => '100x100>',:small => '150x150>', :large => '320x240>' }

validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

accepts_nested_attributes_for :tags



end
