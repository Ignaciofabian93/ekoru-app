# Ekoru - Ecological Ecommerce Site Folder Structure

```
ekoru-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── profile/
│   │       ├── settings/
│   │       ├── favorites/
│   │       ├── orders/
│   │       ├── listings/
│   │       └── impact-dashboard/
│   ├── (marketplace)/
│   │   ├── departments/
│   │   │   └── [departmentSlug]/
│   │   │       └── categories/
│   │   │           └── [categorySlug]/
│   │   │               └── subcategories/
│   │   │                   └── [subcategorySlug]/
│   │   ├── products/
│   │   │   ├── [productId]/
│   │   │   ├── search/
│   │   │   ├── sell/
│   │   │   ├── exchange/
│   │   │   └── donate/
│   │   ├── stores/
│   │   │   ├── [storeId]/
│   │   │   ├── register-store/
│   │   │   └── browse/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── orders/
│   │       └── [orderId]/
│   ├── (community)/
│   │   ├── people/
│   │   │   ├── [userId]/
│   │   │   └── browse/
│   │   ├── activities/
│   │   │   ├── [activityId]/
│   │   │   ├── create/
│   │   │   └── categories/
│   │   │       └── [categorySlug]/
│   │   ├── groups/
│   │   │   ├── [groupId]/
│   │   │   ├── create/
│   │   │   └── join/
│   │   ├── events/
│   │   │   ├── [eventId]/
│   │   │   ├── create/
│   │   │   └── calendar/
│   │   └── forums/
│   │       ├── [topicId]/
│   │       └── categories/
│   │           └── [categorySlug]/
│   ├── (blog)/
│   │   ├── posts/
│   │   │   └── [slug]/
│   │   ├── categories/
│   │   │   └── [categorySlug]/
│   │   ├── authors/
│   │   │   └── [authorId]/
│   │   └── tags/
│   │       └── [tagSlug]/
│   ├── (legal)/
│   │   ├── privacy-policy/
│   │   ├── terms-of-service/
│   │   ├── sustainability-commitment/
│   │   └── community-guidelines/
│   ├── about/
│   ├── contact/
│   ├── impact/
│   │   ├── calculator/
│   │   ├── methodology/
│   │   └── global-impact/
│   ├── help/
│   │   ├── faq/
│   │   ├── how-to-sell/
│   │   ├── how-to-buy/
│   │   ├── sustainability-guide/
│   │   └── community-guide/
│   └── api/
│       ├── auth/
│       ├── products/
│       ├── stores/
│       ├── users/
│       ├── orders/
│       ├── blog/
│       ├── community/
│       ├── impact/
│       ├── search/
│       ├── notifications/
│       ├── analytics/
│       └── admin/
│
├── ui/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── loginForm.tsx
│   │   │   ├── registerForm.tsx
│   │   │   └── profileCard.tsx
│   │   ├── marketplace/
│   │   │   ├── productGrid.tsx
│   │   │   ├── productFilters.tsx
│   │   │   ├── categoryBrowser.tsx
│   │   │   ├── searchBar.tsx
│   │   │   ├── priceFilter.tsx
│   │   │   ├── conditionFilter.tsx
│   │   │   └── sortDropdown.tsx
│   │   ├── community/
│   │   │   ├── userProfile.tsx
│   │   │   ├── activityFeed.tsx
│   │   │   ├── eventCard.tsx
│   │   │   ├── groupCard.tsx
│   │   │   └── forumPost.tsx
│   │   ├── blog/
│   │   │   ├── postCard.tsx
│   │   │   ├── postContent.tsx
│   │   │   ├── authorBio.tsx
│   │   │   └── relatedPosts.tsx
│   │   ├── impact/
│   │   │   ├── impactBadge.tsx
│   │   │   ├── impactCalculator.tsx
│   │   │   ├── impactChart.tsx
│   │   │   ├── co2Savings.tsx
│   │   │   ├── waterSavings.tsx
│   │   │   └── wasteSavings.tsx
│   │   ├── admin/
│   │   │   ├── moderationQueue.tsx
│   │   │   ├── analyticsChart.tsx
│   │   │   └── impactDataForm.tsx
│   │   └── common/
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       ├── breadcrumbs.tsx
│   │       ├── pagination.tsx
│   │       ├── loadingSpinner.tsx
│   │       └── errorBoundary.tsx
│   ├── cards/
│   │   ├── product/
│   │   │   ├── productCard.tsx (existing)
│   │   │   ├── productDetailCard.tsx
│   │   │   ├── impactCard.tsx
│   │   │   └── sellerCard.tsx
│   │   ├── store/
│   │   │   ├── storeCard.tsx (existing)
│   │   │   ├── storeDetailCard.tsx
│   │   │   └── storeImpactCard.tsx
│   │   ├── user/
│   │   │   ├── userCard.tsx
│   │   │   ├── userProfileCard.tsx
│   │   │   └── userImpactCard.tsx
│   │   ├── community/
│   │   │   ├── activityCard.tsx
│   │   │   ├── eventCard.tsx
│   │   │   └── groupCard.tsx
│   │   └── blog/
│   │       ├── blogCard.tsx
│   │       └── featuredPostCard.tsx
│   ├── buttons/ (existing)
│   ├── inputs/ (existing)
│   ├── modals/
│   │   ├── productModal.tsx
│   │   ├── impactModal.tsx
│   │   ├── contactSellerModal.tsx
│   │   ├── reportModal.tsx
│   │   └── shareModal.tsx
│   ├── forms/
│   │   ├── productForm.tsx
│   │   ├── storeForm.tsx
│   │   ├── profileForm.tsx
│   │   ├── reviewForm.tsx
│   │   └── contactForm.tsx
│   ├── navigation/
│   │   ├── mainNav.tsx
│   │   ├── categoryNav.tsx
│   │   ├── userNav.tsx
│   │   ├── mobileNav.tsx
│   │   └── breadcrumbNav.tsx
│   └── layout/
│       ├── mainLayout.tsx
│       ├── marketplaceLayout.tsx
│       ├── communityLayout.tsx
│       ├── blogLayout.tsx
│       └── adminLayout.tsx
│
├── lib/
│   ├── auth/
│   │   ├── config.ts
│   │   ├── middleware.ts
│   │   └── providers.ts
│   ├── database/
│   │   ├── schema/
│   │   │   ├── users.ts
│   │   │   ├── products.ts
│   │   │   ├── stores.ts
│   │   │   ├── departments.ts
│   │   │   ├── categories.ts
│   │   │   ├── orders.ts
│   │   │   ├── reviews.ts
│   │   │   ├── blog.ts
│   │   │   ├── community.ts
│   │   │   └── impact.ts
│   │   ├── migrations/
│   │   └── connections.ts
│   ├── services/
│   │   ├── productService.ts
│   │   ├── storeService.ts
│   │   ├── userService.ts
│   │   ├── orderService.ts
│   │   ├── blogService.ts
│   │   ├── communityService.ts
│   │   ├── impactService.ts
│   │   ├── searchService.ts
│   │   ├── emailService.ts
│   │   └── notificationService.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── impactCalculations.ts
│   │   └── imageUtils.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   ├── useImpact.ts
│   │   ├── useCommunity.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   └── types/
│       ├── auth.ts
│       ├── product.ts
│       ├── store.ts
│       ├── user.ts
│       ├── order.ts
│       ├── blog.ts
│       ├── community.ts
│       ├── impact.ts
│       └── common.ts
│
├── data/
│   ├── departments.json
│   ├── categories.json
│   ├── impactData.json
│   ├── materials.json
│   └── seedData/
│       ├── products.json
│       ├── stores.json
│       └── users.json
│
├── styles/
│   ├── globals.css (existing)
│   ├── components.css
│   ├── marketplace.css
│   ├── community.css
│   ├── blog.css
│   └── admin.css
│
├── public/
│   ├── images/
│   │   ├── impact/
│   │   │   ├── co2-icon.svg
│   │   │   ├── water-icon.svg
│   │   │   └── waste-icon.svg
│   │   ├── categories/
│   │   ├── departments/
│   │   ├── blog/
│   │   └── community/
│   ├── icons/ (existing svgs)
│   └── assets/
│       ├── logo/
│       ├── badges/
│       └── placeholders/
│
├── middleware.ts
├── next.config.ts (existing)
├── package.json (existing)
├── tsconfig.json (existing)
├── tailwind.config.ts
└── README.md (existing)
```

## Key Features of This Structure

### 1. **Route Groups** (parentheses)

- `(auth)`: Authentication related pages
- `(marketplace)`: Product and store related pages
- `(community)`: Social features and community
- `(blog)`: Content management and blog
- `(admin)`: Administrative interface
- `(legal)`: Legal and policy pages

### 2. **Marketplace Hierarchy**

- **Departments** → **Categories** → **Subcategories** → **Products**
- Support for different transaction types (sell, exchange, donate)
- Store management and discovery

### 3. **Community Features**

- People profiles and discovery
- Activities and events
- Groups and forums
- Social interaction features

### 4. **Impact Tracking**

- Dedicated components for environmental impact
- CO2, water, and waste savings calculations
- Impact methodology and transparency

### 5. **Modular UI Components**

- Organized by feature area
- Reusable across different sections
- Specialized components for impact display

### 6. **Backend Structure**

- Comprehensive API routes
- Proper service layer organization
- Database schema for all features
- Impact calculation utilities

### 7. **Data Management**

- Static data for departments/categories
- Impact calculation tables
- Seed data for development
