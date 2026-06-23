# Ghazi Restaurant — AWS Deployment

Static React site deploy options: **AWS Amplify** (easiest) or **S3 + CloudFront** (manual).

## Option 1 — AWS Amplify (recommended)

1. Push this repo to GitHub.
2. Open [AWS Amplify Console](https://console.aws.amazon.com/amplify/).
3. **New app → Host web app → GitHub** → select this repository.
4. Amplify reads `amplify.yml` automatically.
5. Deploy. Your site gets a URL like `https://main.xxxxx.amplifyapp.com`.

SPA routing is handled by `amplify.yml` (`customRedirects`).

## Option 2 — S3 + CloudFront

### One-time setup

1. Install [AWS CLI](https://aws.amazon.com/cli/) and configure credentials:

```bash
aws configure
```

2. Create infrastructure:

```bash
npm run aws:stack
```

3. Get outputs:

```bash
aws cloudformation describe-stacks --stack-name ghazi-restaurant --query "Stacks[0].Outputs"
```

Note the **BucketName**, **DistributionId**, and **WebsiteURL**.

4. Set environment variables (Windows PowerShell):

```powershell
$env:AWS_S3_BUCKET="ghazi-restaurant-123456789"
$env:AWS_CLOUDFRONT_DISTRIBUTION_ID="E1234567890ABC"
$env:AWS_REGION="us-east-1"
```

### Deploy updates

```bash
npm run deploy:aws
```

This builds `dist/`, uploads to S3, and invalidates CloudFront cache.

## Local build test

```bash
npm run build
npm run preview
```

## Notes

- React Router needs SPA fallback — configured in `amplify.yml`, `public/_redirects`, and CloudFormation `CustomErrorResponses`.
- Images are bundled locally; no external CDN required at runtime.
- For a custom domain, add it in Amplify or attach an ACM certificate to CloudFront.
