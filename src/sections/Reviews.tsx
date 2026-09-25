import type { Translator } from '../i18n/translator';
import './Reviews.css';

type Review = { name: string; text: string; rating: number };

const MAX_RATING = 5;

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`review__star ${filled ? '' : 'review__star--empty'}`} aria-hidden="true">
      <path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z" />
    </svg>
  );
}

/**
 * Customer reviews. Each card is a single solid rounded rectangle with the
 * rating strip separated from the body by a divider.
 */
export default function Reviews({ tr }: { tr: Translator }) {
  const reviews = tr.raw<Review[]>('reviews.items');

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <h2 id="reviews-title" className="h-section is-accent">
          {tr.t('reviews.title')}
        </h2>

        <ul className="reviews__grid">
          {reviews.map((review, i) => (
            <li key={i} className="review">
              <figure className="review__body">
                <span className="review__quote" aria-hidden="true">
                  “
                </span>
                <figcaption className="review__name">{review.name}</figcaption>
                <blockquote className="review__text">
                  <p>{review.text}</p>
                </blockquote>
              </figure>
              <div
                className="review__rating"
                role="img"
                aria-label={tr.t('reviews.ratingLabel').replace('{rating}', String(review.rating))}
              >
                {Array.from({ length: MAX_RATING }, (_, s) => (
                  <Star key={s} filled={s < review.rating} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
