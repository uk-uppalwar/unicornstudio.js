from playwright.sync_api import sync_playwright

def verify_shield_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a larger viewport to see the desktop sidebar
        page = browser.new_page(viewport={"width": 1400, "height": 900})

        try:
            # 1. Visit the app
            page.goto("http://localhost:5173")

            # Wait for content to load (skeleton to disappear)
            page.wait_for_selector("text=Security Dashboard", timeout=5000)

            # 2. Take a screenshot of the default light mode (desktop)
            page.screenshot(path="verification/dashboard_light_desktop.png")
            print("Captured light mode desktop screenshot")

            # 3. Toggle Dark Mode
            # Find the theme toggle button. It has title "Switch to Dark Mode" initially
            theme_toggle = page.get_by_role("button", name="Toggle Theme")
            theme_toggle.click()

            # Allow transition to complete
            page.wait_for_timeout(500)

            # Take screenshot of dark mode
            page.screenshot(path="verification/dashboard_dark_desktop.png")
            print("Captured dark mode desktop screenshot")

            # 4. Verify Mobile Layout
            page.set_viewport_size({"width": 375, "height": 812})
            page.wait_for_timeout(200) # Allow resize transition

            # Verify hamburger menu exists
            menu_btn = page.get_by_role("button").first # The menu button is the first button in nav on mobile
            # Better selector:
            # menu_btn = page.locator("nav button").first

            page.screenshot(path="verification/dashboard_dark_mobile.png")
            print("Captured dark mode mobile screenshot")

            # Open sidebar on mobile
            # The first button in the nav bar is the menu toggle on mobile
            # based on my code: <button onClick={toggleSidebar} ... lg:hidden>
            page.locator("nav button").first.click()
            page.wait_for_timeout(500) # Wait for drawer animation

            page.screenshot(path="verification/dashboard_dark_mobile_drawer.png")
            print("Captured mobile drawer screenshot")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_shield_layout()
