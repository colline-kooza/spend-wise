const fs = require('fs');
const path = require('path');

console.log('Validating Web Apps JSON Files...\n');

const files = [
  'web-apps-1.json',
  'web-apps-2.json',
  'web-apps-3.json',
  'web-apps-4.json',
  'web-apps-5.json',
  'web-apps-6.json'
];

let totalApps = 0;
let allValid = true;
const allApps = [];

files.forEach((filename, fileIndex) => {
  const filePath = path.join(__dirname, '..', 'src', 'data', filename);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const fileNum = fileIndex + 1;

    console.log(`\n📄 ${filename}`);
    console.log(`   Apps: ${data.apps.length}`);
    console.log(`   Industries: ${data.meta.industries_covered.join(', ')}`);

    // Validate each app
    data.apps.forEach((app, index) => {
      const expectedId = (fileNum - 1) * 10 + index + 1;

      // Check ID sequence
      if (app.id !== expectedId) {
        console.log(`   ❌ App ${index + 1}: ID mismatch (expected ${expectedId}, got ${app.id})`);
        allValid = false;
      }

      // Check required fields
      const requiredFields = [
        'id', 'industryId', 'slug', 'name', 'tagline',
        'shortDescription', 'longDescription', 'seo', 'hero',
        'stats', 'problemStatement', 'features', 'pricing',
        'whoIsThisFor', 'integrations', 'faqs', 'testimonials',
        'caseStudies', 'comparison', 'relatedApps', 'relatedBlogs',
        'technicalSpecs', 'trustSignals', 'cta'
      ];

      const missingFields = requiredFields.filter(field => !app[field]);
      if (missingFields.length > 0) {
        console.log(`   ❌ App ${app.id} (${app.name}): Missing fields: ${missingFields.join(', ')}`);
        allValid = false;
      }

      // Validate counts
      const validations = [
        { field: 'seo.keywords', expected: 12, actual: app.seo?.keywords?.length },
        { field: 'stats', expected: 4, actual: app.stats?.length },
        { field: 'problemStatement.problems', expected: 4, actual: app.problemStatement?.problems?.length },
        { field: 'features', expected: 6, actual: app.features?.length },
        { field: 'pricing.tiers', expected: 3, actual: app.pricing?.tiers?.length },
        { field: 'whoIsThisFor', expected: 4, actual: app.whoIsThisFor?.length },
        { field: 'integrations', expected: 4, actual: app.integrations?.length },
        { field: 'faqs', expected: 10, actual: app.faqs?.length },
        { field: 'testimonials', expected: 3, actual: app.testimonials?.length },
        { field: 'caseStudies', expected: 2, actual: app.caseStudies?.length },
        { field: 'comparison.advantages', expected: 5, actual: app.comparison?.advantages?.length },
        { field: 'relatedApps', expected: 3, actual: app.relatedApps?.length },
        { field: 'relatedBlogs', expected: 4, actual: app.relatedBlogs?.length }
      ];

      validations.forEach(v => {
        if (v.actual !== v.expected) {
          console.log(`   ⚠️  App ${app.id} (${app.name}): ${v.field} count (expected ${v.expected}, got ${v.actual || 0})`);
        }
      });

      // Check slug uniqueness
      allApps.push({ id: app.id, slug: app.slug, name: app.name });

      totalApps++;
    });

    console.log(`   ✓ Validated ${data.apps.length} apps`);

  } catch (error) {
    console.log(`   ❌ Error reading ${filename}: ${error.message}`);
    allValid = false;
  }
});

// Check for duplicate slugs
console.log('\n\n🔍 Checking for duplicate slugs...');
const slugs = allApps.map(a => a.slug);
const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

if (duplicateSlugs.length > 0) {
  console.log(`❌ Found duplicate slugs: ${duplicateSlugs.join(', ')}`);
  allValid = false;
} else {
  console.log('✓ All slugs are unique');
}

// Check for duplicate IDs
console.log('\n🔍 Checking for duplicate IDs...');
const ids = allApps.map(a => a.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  console.log(`❌ Found duplicate IDs: ${duplicateIds.join(', ')}`);
  allValid = false;
} else {
  console.log('✓ All IDs are unique (1-60)');
}

// Summary
console.log('\n\n' + '='.repeat(50));
console.log('VALIDATION SUMMARY');
console.log('='.repeat(50));
console.log(`Total Files: ${files.length}`);
console.log(`Total Apps: ${totalApps}`);
console.log(`Status: ${allValid ? '✅ PASSED' : '❌ FAILED'}`);
console.log('='.repeat(50) + '\n');

process.exit(allValid ? 0 : 1);
