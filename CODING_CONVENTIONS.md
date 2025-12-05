
<coding-conventions>
#### FUNDAMENTAL PRINCIPLE: Minimize Cyclomatic Complexity Above All

Every instruction in this document serves ONE purpose: reducing execution paths.
High complexity is the root of all evil in code. Everything else is just tactics.

Remember: Each decision point doubles possible states. Our goal is ZERO unnecessary paths.

#### ========================

#### PART 1: ENGINEERING PRINCIPLES

#### ========================

##### Critical Code Consistency Checks

When making any code changes, always perform these meta-cognitive checks:

###### 1. Invariants - "In the first place..."

System conditions that must always be satisfied.

- "In the first place, this system cannot function without this code unless there's a replacement"
- Before removing any code, identify what fundamental role it serves

###### 2. Dependencies - "This change will..."

Ripple effects of modifications.

- "This change will inevitably affect other parts. If not, this was dead code, which is unlikely"
- Track all downstream impacts of your changes

###### 3. Cross-cutting Concerns - "I just changed the premise..."

System-wide implications.

- "I just changed a fundamental assumption. This high-level abstraction must have dependent implementations"
- Consider architectural impacts when modifying core abstractions

###### 4. Consistency Constraints - "If this name exists..."

Conceptual patterns and symmetry.

- "If this name/pattern exists here, similar ones should exist elsewhere"
- Look for symmetric operations (create/delete, start/stop, open/close)
- Check for naming conventions that imply paired or grouped functionality

###### Example Application

When deleting `userRepository.delete(id)`:

- Invariant: "In the first place, a user system needs deletion capability"
- Dependencies: "This change will break user management UI and API endpoints"
- Cross-cutting: "I just changed the Repository pattern's contract"
- Consistency: "If delete exists, create/update/read should follow the same pattern"

##### Code Simplicity Principles

###### Avoid Speculative Generality

- NO unused parameters with defaults "just in case"
- NO environment variables without immediate use
- NO abstract base classes for single implementations
- NO configuration options that aren't actually configured

###### Apply YAGNI strictly

When tempted to add "flexibility":

1. Is this needed NOW? If no, don't add it
2. Does this increase cognitive load? If yes, don't add it
3. Can I add it later when actually needed? If yes, don't add it now

###### Examples of violations:

❌ `function process(data, options = {}, futureFlag = false)`
✅ `function process(data)`

❌ `const API_VERSION = process.env.API_VERSION || 'v1' // never changed`
✅ `const API_VERSION = 'v1'`

##### Fail Fast and Contract Programming

###### Assert Preconditions - Let it crash!

- Precondition violations are BUGS, not exceptions to handle
- Use assertions for programmer errors, not runtime conditions
- NEVER catch AssertionError

❌ Bad:

```python
def divide(a, b):
   if b == 0:
       return None  # Silent failure
   return a / b
```

✅ Good:

```python
def divide(a, b):
   assert b != 0, "Divisor must be non-zero"  # Crash on bug
   return a / b
```

###### Catch Only What You Handle

- NO catch-all except at system boundaries (main/thread entry/daemon loop)
- Every catch block must DO something meaningful
- Transform errors only when changing abstraction levels

❌ Bad:

```python
try:
   process_data()
except Exception:
   pass  # Swallowing errors
```

✅ Good:

```python
# At module boundary only
try:
   result = parse_config()
except JSONDecodeError as e:
   raise ConfigError(f"Invalid config format: {e}")  # Meaningful transformation
```

###### No Redundant Validation

- Check preconditions ONCE at entry point
- Trust your own return values
- Internal functions assume preconditions are met

##### Function Control Flow - Avoid Early Returns

###### The Problem with Early Returns

Early returns hide complexity. Every return statement creates a hidden exit point that:

- Fragments the control flow
- Makes it harder to understand all possible paths
- Often indicates mixed responsibilities or poor design

###### Reading Functions Backwards

Start reviewing functions from their END:

```typescript
function processData(input: Data): Result {
  // ... implementation ...

  // START READING HERE ↓
  return computedResult;
} // ← Review begins here
```

Then scan UPWARD for early returns. Each one is a red flag.

###### Common Early Return Anti-Patterns

1. Defensive Programming (Should be Assert)

```typescript
// ❌ Bad - Hiding bugs with early returns
function calculate(data: Data) {
  if (!data) return null; // This is a BUG, not a valid state
  if (data.items.length === 0) return 0; // Why is empty invalid?
}

// ✅ Good - Make bugs crash immediately
function calculate(data: Data) {
  assert(data !== null, 'Data cannot be null - fix caller');
  // Handle empty arrays naturally
  return data.items.reduce((sum, item) => sum + item.value, 0);
}
```

2. Validation at Wrong Layer

```typescript
// ❌ Bad - Checking what should be validated upstream
function sendEmail(user: User) {
  if (!user.email) return; // Why does User not have email?
}

// ✅ Good - Fix the type system
function sendEmail(user: UserWithEmail) {
  // No check needed - type guarantees email exists
}
```

3. Mixed Responsibilities

```typescript
// ❌ Bad - Multiple concerns in one function
function processPayment(payment: Payment) {
  if (!payment.isValid()) return { error: 'invalid' };
  if (payment.amount > 10000) return { error: 'too large' };
  // actual processing
}

// ✅ Good - Separate validation from processing
function validatePayment(payment: Payment): ValidationResult {
  /* ... */
}
function processValidPayment(payment: ValidPayment): Result {
  /* ... */
}
```

###### The Assert Principle

**IMPORTANT: Assertions must work in production!** Never disable assertions in production builds.

Use assertions for programmer errors (bugs):

- Precondition violations
- Impossible states
- Type system guarantees
- Data integrity violations

The distinction is simple:

- **User can cause it** → Handle with if/else
- **Only programmer can cause it** → Assert and crash

###### Why Mid-Function Returns Are Suspicious

When functions have clear, single responsibilities, they naturally flow to the end:

```typescript
// Natural flow - asserts for bugs, business logic at end
function processOrder(order: Order): ProcessResult {
  // Preconditions (bugs if violated)
  assert(order.items.length > 0, 'Empty orders should not exist');
  assert(order.customerId, 'Orders must have customer');

  // Process data
  const total = calculateTotal(order.items);
  const discount = getDiscount(order.customerId);

  // Business decision at the END
  if (total > 1000) {
    return { status: 'needs-approval', total };
  } else {
    return { status: 'auto-approved', total };
  }
}
```

Mid-function returns usually indicate:

1. **Bug checks masquerading as business logic** → Use assert instead
2. **Validation at wrong layer** → Push to data source
3. **Mixed responsibilities** → Split the function

##### Embrace Breaking Changes - You Own Everything

###### No False Backward Compatibility

- This is a PRODUCT, not a library - break things freely
- You control ALL call sites - refactor them together
- Adding parameters "for compatibility" is design cowardice

❌ Bad - Minimal edit disease:

```python
def process_user(id, include_deleted=False):  # Added parameter for "compatibility"
   if include_deleted:
       # new logic
   else:
       # old logic
```

✅ Good - Analyze and redesign:

```python
# Step 1: Understand the two call patterns
# Step 2: Find the proper abstraction boundary
# Step 3: Refactor EVERYTHING to the new design
def get_active_users()
def get_all_users_including_deleted()
```

###### Design Process for Diverging Requirements

When two callers need different behavior:

1. DON'T add a flag parameter
2. DO analyze the responsibility difference
3. DO consider if abstraction is even appropriate
4. DO refactor all callers if design changes

Remember: You can change EVERYTHING. Use that power.

#### ========================

#### PART 2: HUMAN DELEGATION

#### ========================

##### Delegate When It's Faster

###### GUI Tasks → Always Delegate

- Browser configurations
- Visual interfaces
- Login/2FA/CAPTCHA
- "Please open [URL] and click [button]"

###### Failed Attempts → Stop and Delegate

- Command timed out 2+ times
- Workaround more complex than manual task
- "This failed repeatedly. Please run: [command]"

###### Anti-patterns

❌ Forcing automation on GUI tasks
❌ Endless retry loops
❌ Complex workarounds for simple manual tasks

✅ "This is faster manually because [reason]"
✅ "Please handle this step: [clear instructions]"

##### Key Principle

**Efficiency > Automation**

- 5min manual work > 30min failed automation
- Admit limitations early
- Clear delegation > broken systems

#### ========================

#### PART 3: QUICK REFERENCE (REMEMBER THESE!)

#### ========================

##### Decision Priority

1. **First YAGNI** - Is this feature actually needed NOW?
2. **Then Assert** - Is this a bug or user-caused?
3. **Finally Refactor** - You can change EVERYTHING. Don't hesitate.

##### Key Phrases to Remember

When coding, keep asking yourself:

- "YAGNI" - You Aren't Gonna Need It → Ask before adding
- "In the first place..." - Check invariants → Ask before deleting
- "This change will..." - Track dependencies → Trace the ripples
- "Let it crash!" - Fail fast on bugs → Kill bugs immediately
- "I own everything" - Break compatibility freely → Fix everything

##### Three Things to Apply Today

1. **See speculative generality → Delete it**
2. **See `if (!x) return` → Consider assert**
3. **See flag parameter → Consider function split**

Remember: Speculative generality is a lie. Hard-code until proven otherwise.
</coding-conventions>

