# Spendy — QA Training App

A Flutter expense tracking demo application built specifically for QA engineer training. The app covers a realistic feature set — transactions, categories, search, filtering, statistics — giving a meaningful surface to practice widget testing.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features Overview](#features-overview)
- [Test Data](#test-data)
- [Widget Keys Reference](#widget-keys-reference)
- [Key Business Logic](#key-business-logic)
- [Known Limitations](#known-limitations)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Dart 3.x |
| Framework | Flutter (Material 3 + Cupertino) |
| Local storage | `shared_preferences` |
| Swipe gestures | `flutter_slidable` |
| Min SDK | Android 21 / iOS 13 |

---

## Project Structure

```
lib/
├── main.dart                        # App entry point, theme, AppColors tokens
├── models/
│   ├── transaction.dart             # Transaction model + copyWith + isPlanned logic
│   ├── category.dart                # Category model + default categories
│   └── mock_data.dart               # Initial seed data (loaded on first launch only)
├── pages/
│   ├── home_page.dart               # Main screen: balance, search, filters, transaction list
│   ├── stats_page.dart              # Statistics: overview, by category, top expenses
│   ├── settings_page.dart           # Settings: confirm-delete toggle, categories link
│   └── categories_page.dart         # Category management: list + add/edit/delete sheet
├── services/
│   └── storage_service.dart         # SharedPreferences read/write for all persisted data
├── utils/
│   ├── date_formatter.dart          # Human-readable date strings
│   └── emoji_color.dart             # Hash-based pastel background per emoji
└── widgets/
    ├── balance_card.dart            # Editable budget card with progress bar
    ├── add_transaction_sheet.dart   # Bottom sheet: create new transaction
    ├── transaction_detail_sheet.dart # Bottom sheet: view / edit / delete transaction
    ├── transaction_components.dart  # TransactionTile (swappable list item)
    ├── category_chips.dart          # Filter chips shared between home and edit sheet
    ├── search_bar.dart              # Search input widget
    └── delete_confirm_dialog.dart   # Reusable confirmation dialog
```

---

## Getting Started

### Prerequisites

- Flutter SDK `>=3.0.0` — [install guide](https://docs.flutter.dev/get-started/install)
- Android emulator / iOS Simulator, or physical device
- Git

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/HoliakDenys/spendy-qa.git
cd spendy-qa

# 2. Install dependencies
flutter pub get

# 3. Run on connected device or emulator
flutter run

# 4. Run widget tests
flutter test
```

### First Launch Behavior

On first launch (empty storage) the app loads **seed data** from `MockData.initialTransactions` — 12 pre-built transactions across all categories with relative dates (`today`, `today - N days`, `today + N days`).

Anything added or modified during testing is saved to `SharedPreferences` on-device and **does not affect** other devices or the seed data in code.

To reset to seed data: **Settings → Delete all transactions**.

---

## Features Overview

### Home Screen

| Feature | Description |
|---|---|
| Balance card | Shows total budget vs. spent. Tap the edit icon to change the budget. |
| Search | Filters transactions by title in real time. Tap anywhere outside to dismiss keyboard. |
| Category filter chips | Tap to filter by category. Tap again to deselect. |
| Transaction list | Separated into **Planned & Overdue** and **Recent History** sections. |
| Swipe left | Reveals Delete action (with optional confirmation dialog). |
| Tap tile | Opens transaction detail sheet. |

### Transaction Detail / Edit

| Mode | Available actions |
|---|---|
| View | Mark as done (planned only), Edit, Delete, Cancel |
| Edit | Change title, amount, date, note, category. Date picker auto-updates Planned/Completed status. |

### Statistics

Three time periods: **This Week**, **This Month**, **All Time**.

Shows: completed vs. planned totals, spending by category (bar chart), top 5 expenses.

### Categories

Default categories: Food 🍔, Transport 🚗, Housing 🏠, Health 💊, Entertainment 🎮, Shopping 🛍️, Bills ⚡, Other 📦.

You can add, rename, change emoji, or delete categories. Deleting a category sets affected transactions to uncategorized.

### Settings

| Setting | Behavior |
|---|---|
| Confirm before deletion | When ON — shows confirmation dialog before swipe-delete. When OFF — deletes immediately. |
| Categories | Navigates to category management page. |
| Delete all transactions | Wipes all transactions; resets to empty list (not seed data). |

---

## Test Data

Seed transactions loaded on first launch (`lib/models/mock_data.dart`):

| ID | Title | Amount | Status | Category |
|---|---|---|---|---|
| mock_1 | Groceries | $150.00 | Planned (+7 days) | Food |
| mock_2 | Internet Bill | $60.00 | Planned (+5 days) | Bills |
| mock_3 | Gym Membership | $35.00 | Planned (+12 days) | Health |
| mock_4 | Rent | $1200.00 | **Overdue** (-2 days) | Housing |
| mock_5 | Coffee | $5.50 | Completed (today) | Food |
| mock_6 | Bus ticket | $2.80 | Completed (today) | Transport |
| mock_7 | Electricity Bill | $75.00 | Completed (yesterday) | Bills |
| mock_8 | Dinner Out | $60.00 | Completed (-3 days) | Food |
| mock_9 | Gas | $45.00 | Completed (-4 days) | Transport |
| mock_10 | Netflix | $15.99 | Completed (-6 days) | Entertainment |
| mock_11 | Pharmacy | $22.50 | Completed (-8 days) | Health |
| mock_12 | T-shirt | $29.99 | Completed (-10 days) | Shopping |

Default categories (always present, `lib/models/category.dart`):

`food` · `transport` · `housing` · `health` · `entertainment` · `shopping` · `bills` · `other`

---

## Widget Keys Reference

All interactive elements have a `Key` assigned for use in widget tests and automated UI testing (Appium, Patrol, etc.).

### Navigation

| Key | Widget | Location |
|---|---|---|
| `btn_stats` | Statistics button | Home AppBar |
| `btn_settings` | Settings button | Home AppBar |
| `btn_add_transaction` | Add transaction (+) button | Home AppBar |

### Home Screen

| Key | Widget | Notes |
|---|---|---|
| `search_bar` | Search bar container | Outer wrapper |
| `chip_all` | "All" filter chip | Deselects category filter |
| `chip_cat_{id}` | Category filter chip | e.g. `chip_cat_food`, `chip_cat_bills` |
| `tile_{id}` | Transaction list tile | e.g. `tile_mock_5`, `tile_mock_1` |
| `slidable_{id}` | Slidable swipe container | e.g. `slidable_mock_5` |
| `btn_edit_balance` | Edit budget icon on balance card | |

### Add Transaction Sheet

| Key | Widget |
|---|---|
| `input_tx_title` | Title text field |
| `input_tx_amount` | Amount text field |
| `btn_tx_date` | Date picker row |
| `input_tx_note` | Note text field |
| `btn_save_transaction` | Save button |

### Transaction Detail / Edit Sheet

| Key | Widget | Visible in |
|---|---|---|
| `btn_mark_done` | Mark as done button | View mode, planned transactions only |
| `btn_delete_transaction` | Delete (trash) icon | View mode |
| `btn_edit_transaction` | Edit button | View mode |
| `btn_cancel` | Cancel button | View mode |
| `btn_save_changes` | Save changes button | Edit mode |
| `input_edit_title` | Title field | Edit mode |
| `input_edit_amount` | Amount field | Edit mode |
| `btn_edit_date` | Date picker row | Edit mode |

### Settings

| Key | Widget |
|---|---|
| `switch_confirm_delete` | Confirm before deletion toggle |
| `btn_categories` | Categories navigation row |
| `btn_delete_all` | Delete all transactions row |

### Categories Page

| Key | Widget | Notes |
|---|---|---|
| `btn_add_category` | Add (+) button | AppBar |
| `btn_cat_{id}` | Category list row | e.g. `btn_cat_food` |
| `input_cat_emoji` | Emoji input field | Edit sheet |
| `input_cat_name` | Name input field | Edit sheet |
| `btn_save_category` | Save button | Edit sheet |
| `btn_delete_category` | Delete icon | Edit sheet, existing categories only |

### Statistics

| Key | Widget | Notes |
|---|---|---|
| `btn_period_week` | "This Week" tab | |
| `btn_period_month` | "This Month" tab | |
| `btn_period_allTime` | "All Time" tab | |

---

## Key Business Logic

### Planned vs Completed vs Overdue

Status is derived **automatically from the transaction date** — it is never stored as a manual toggle.

```
date > today          →  Planned   (shown in blue-indigo)
date = today          →  Completed
date < today          →  Completed
isPlanned && date < today  →  Overdue  (shown in red)
```

`isPlanned` is re-calculated on every load (`fromJson`) so a transaction that was Planned yesterday automatically becomes Overdue today without any user action.

**Marking as done** sets the date to `DateTime.now()` → status becomes Completed automatically.

### Budget & Balance

- Budget is user-editable on the balance card.
- Spent = sum of all **Completed** transactions.
- Planned amounts do not affect the spent total.
- Progress bar color: green → yellow → red as spending approaches budget.

### Data Persistence

All data is stored in `SharedPreferences` (key-value, on-device). Categories and transactions are serialized as JSON. There is no network layer.

### Search & Filter

Search and category filter work together (AND logic): the list shows transactions matching **both** the search query and the selected category.

---

## Known Limitations

- No network / backend — all data is local only.
- No multi-currency support — USD display only.
- No recurring transactions.
- No export functionality.
- Statistics bar chart is a simple custom implementation (no charting library).
- App is intentionally single-user; no authentication.