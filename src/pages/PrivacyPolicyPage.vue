//PrivacyPolicyPage.vue
<template>
  <q-page padding>
    <div class="q-pa-md">
      <h4 class="text-h4 q-mb-md text-primary">Privacy Policy</h4>

      <div class="text-caption text-grey-7 q-mb-lg">
        Last updated: February 7, 2025
      </div>

      <div class="text-body1 q-mb-lg">
        Dictionary Lens ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how our application handles information when you use our service.
      </div>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Information Collection and Use</h5>
        <p class="text-body1">
          Dictionary Lens is designed with privacy in mind and operates primarily on your device. Here's how we handle different types of information:
        </p>

        <h6 class="text-h6 q-mt-lg q-mb-md">Camera and Images</h6>
        <q-list bordered>
          <q-item>
            <q-item-section>We require camera access to enable the object detection feature</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Photos taken through the app are processed immediately and are not stored</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Images are only used temporarily for object detection and are discarded after processing</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>No images are transmitted to our servers or stored permanently</q-item-section>
          </q-item>
        </q-list>

        <h6 class="text-h6 q-mt-lg q-mb-md">AI Processing</h6>
        <q-list bordered>
          <q-item>
            <q-item-section>Object detection is performed using third-party AI services (TensorFlow, Google Vision, Azure Vision, and Hugging Face)</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Text generation for translations and examples is performed using OpenAI's services</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Only detected object labels are sent to OpenAI for translation and example generation</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>No personal information or full images are shared with these services</q-item-section>
          </q-item>
        </q-list>

        <h6 class="text-h6 q-mt-lg q-mb-md">Local Storage</h6>
        <q-list bordered>
          <q-item>
            <q-item-section>Translations, example sentences, and plural forms are stored locally on your device</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>This data is not sensitive and contains only educational content</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>You can delete this data at any time through the app's settings</q-item-section>
          </q-item>
        </q-list>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Data Sharing and Transfer</h5>
        <p class="text-body1">We do not:</p>
        <q-list bordered>
          <q-item>
            <q-item-section>Collect personal information</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Store user data on remote servers</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Share any information with third parties for marketing or advertising</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Track user behavior or analytics</q-item-section>
          </q-item>
        </q-list>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Third-Party Services</h5>
        <p class="text-body1">While we use third-party AI services for object detection and translation:</p>
        <q-list bordered>
          <q-item>
            <q-item-section>Only necessary information is shared (object labels for translation)</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>No personal information is included in these requests</q-item-section>
          </q-item>
        </q-list>

        <p class="text-body1 q-mt-md">We recommend reviewing the privacy policies of these services:</p>
        <q-list bordered>
          <q-item v-for="service in thirdPartyServices" :key="service">
            <q-item-section>{{ service }}</q-item-section>
          </q-item>
        </q-list>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Data Security</h5>
        <q-list bordered>
          <q-item>
            <q-item-section>All data processing is done locally on your device</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Translations and related content are stored securely in your device's local database</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Network communications with AI services use industry-standard encryption</q-item-section>
          </q-item>
        </q-list>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Children's Privacy</h5>
        <p class="text-body1">
          Our application does not knowingly collect any personal information from children under 13 years of age.
        </p>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Your Rights</h5>
        <p class="text-body1">You have the right to:</p>
        <q-list bordered>
          <q-item>
            <q-item-section>Access any locally stored data through the app's settings</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Delete all locally stored data at any time</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Control camera permissions through your device settings</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Opt-out of AI processing features if desired</q-item-section>
          </q-item>
        </q-list>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Changes to This Privacy Policy</h5>
        <p class="text-body1">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Contact Us</h5>
        <p class="text-body1">
          If you have any questions about this Privacy Policy, please contact us at:
          <a href="mailto:nemanjam@greenlinetrading.co.uk" class="text-primary">
            nemanjam@greenlinetrading.co.uk
          </a>
        </p>
      </section>

      <section class="q-mb-xl">
        <h5 class="text-h5 q-mb-md text-primary">Consent</h5>
        <p class="text-body1">
          By using Dictionary Lens, you consent to our Privacy Policy and agree to its terms.
        </p>
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const thirdPartyServices = [
  'TensorFlow',
  'Google Cloud Vision API',
  'Azure Computer Vision',
  'Hugging Face',
  'OpenAI'
]
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
