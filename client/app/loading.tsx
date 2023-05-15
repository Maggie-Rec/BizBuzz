import styles from '../styles/Loader.module.css'
import LoadingSkeleton from 'next/'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // return <LoadingSkeleton />;
  return (
   <div className={styles.loader}></div>
 
  )
}