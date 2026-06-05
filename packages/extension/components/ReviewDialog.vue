<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui';
import { X } from '@lucide/vue';
import { Button } from '@/components/ui/button';

// First-generate review prompt (v1 parity).
defineProps<{ open: boolean }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();
</script>

<template>
  <DialogRoot :open="open" @update:open="(v: boolean) => emit('update:open', v)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/40" />
      <DialogContent
        data-testid="review-dialog"
        class="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-5 shadow-lg focus:outline-none"
      >
        <DialogClose
          class="absolute right-3 top-3 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
          aria-label="Close"
        >
          <X class="size-4" />
        </DialogClose>
        <DialogTitle class="text-lg font-semibold">
          We love feedback! 💜
        </DialogTitle>
        <DialogDescription class="mt-2 text-sm text-muted-foreground">
          Did you like this tool? Looking for something specific, or have some
          suggestions? Let us know by leaving a review on Product Hunt — thank
          you so much!
        </DialogDescription>
        <div class="mt-5 flex justify-end gap-2">
          <Button variant="outline" size="sm" @click="emit('update:open', false)">
            I'll do it later
          </Button>
          <Button
            as="a"
            size="sm"
            href="https://www.producthunt.com/products/faker-js-ui/reviews/new"
            target="_blank"
            rel="noopener"
          >
            Give us a review
          </Button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
