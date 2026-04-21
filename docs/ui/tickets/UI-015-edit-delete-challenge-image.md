# UI-015 — Edit and delete challenge — optional cover image

| Field | Value |
|-------|--------|
| **ID** | UI-015 |
| **Status** | Not started |
| **Workflow** | §3.4 + optional image |
| **Owner** | TBD |

## Summary

**PUT** **`/api/challenges/{id}`** with **`ownerUserId`** matching JWT subject; **DELETE** challenge with confirmation. Optional **`POST /api/challenges/{id}/image`** with **`multipart/form-data`** (`file` field per OpenAPI).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §3.4, cover image
- [`docs/ui/ui-description.md`](../ui-description.md) — Challenge PUT/DELETE/image

## Proposed implementation

### Edit

- Form pre-filled from **`GET /api/challenges/{id}`**; same fields as create where applicable.

### Delete

- Confirm dialog; on success navigate to **`/challenges`** or **My challenges** (**UI-011**).

### Image

- File input; show current **`imageUrl`** if any; handle upload errors.

## Acceptance criteria

- [ ] Only owner sees edit/delete (and image upload).
- [ ] PUT preserves **`ownerUserId`** rules.
- [ ] DELETE clears UI and navigates away.
- [ ] Image upload uses multipart; invalidates challenge query.

## Dependencies

- **UI-006**; **UI-004** for current user id.
