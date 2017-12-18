class AddCountryToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :country, :string
  end
end
