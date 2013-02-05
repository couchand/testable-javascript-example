require 'rubygems'
require 'capybara/rspec'
require 'minitest/autorun'

Capybara.default_driver   = :selenium
Capybara.default_selector = :css

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.app_host = 'http://localhost:4000'

class Srchr < MiniTest::Unit::TestCase
  include Capybara::DSL

  def setup
    visit('/')
  end

  def test_page
    assert page.has_content?('Srchr')
  end

  def test_search
    fill_in('q', :with => 'cat')
    find('.btn').click

    # Wait until searching is complete
    page.has_no_selector?('#results .searching')

    assert( page.has_no_selector?('#results li.no-results'), 'No results is not shown' )
    assert( all('#results .result').length > 0, 'Displays search results')
    all('#results .result').each { |result|
      assert(result.text =~ /cat/i, 'Search result contains the search term')
    }
  end

  def test_no_results
    fill_in('q', :with => 'foobarbazbimbop')
    find('.btn').click

    # Wait until searching is complete
    page.has_no_selector?('#results .searching')

    assert( page.has_selector?('#results li.no-results'), 'No results is shown' )
    assert( find('#results li.no-results').has_content?('No results found'), 'No results message is shown' )
  end

  def test_invalid_search
    fill_in('q', :with => ' ')
    find('.btn').click
    assert( page.has_selector?('#results li.no-results') )
  end

  def test_like
    fill_in('q', :with => 'cat')
    find('.btn').click

    # Wait until searching is complete
    page.has_no_selector?('#results .searching')

    first('.like').click
    assert_equal first('#results li h2').text, find('#liked li').text
  end

end
